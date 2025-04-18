import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

// Validate API key exists
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API key - please check your .env file');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert at analyzing video hooks (opening lines) for social media content. 
Analyze the given hook and provide in a json format:
1. A score out of 10
2. Specific feedback about its effectiveness
3. A suggested improvement if the score is less than 9

Focus on:
- Attention-grabbing power
- Emotional appeal
- Curiosity generation
- Length appropriateness
- Target audience relevance`;

export async function POST(req: Request) {
  try {
    const { hook } = await req.json();

    if (!hook || typeof hook !== 'string') {
      return NextResponse.json(
        { error: 'Hook text is required and must be a string' },
        { status: 400 }
      );
    }

    if (hook.trim().length === 0) {
      return NextResponse.json(
        { error: 'Hook text cannot be empty' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: hook }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    if (!completion.choices[0]?.message?.content) {
      console.error('OpenAI API returned invalid response format:', completion);
      throw new Error('Invalid response format from OpenAI API');
    }

    let response;
    try {
      response = JSON.parse(completion.choices[0].message.content);
      
      // Validate response structure
      if (!response.score || !response.feedback) {
        console.error('Invalid response structure:', response);
        throw new Error('Invalid response structure from OpenAI API');
      }
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError);
      throw new Error('Failed to parse analysis results');
    }
    
    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error analyzing hook:', error);
    
    // Handle OpenAI specific errors
    if (error.code === 'invalid_api_key') {
      return NextResponse.json(
        { error: 'Invalid API key. Please check your OpenAI API key configuration.' },
        { status: 401 }
      );
    } else if (error.code === 'insufficient_quota') {
      return NextResponse.json(
        { error: 'OpenAI API quota exceeded. Please check your usage limits.' },
        { status: 429 }
    );
    } else if (error.code === 'rate_limit_exceeded') {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    } else if (error.code === 'context_length_exceeded') {
      return NextResponse.json(
        { error: 'Hook text is too long. Please shorten it and try again.' },
        { status: 400 }
      );
    }

    // Network or connection errors
    if (error.name === 'NetworkError' || error.name === 'FetchError') {
      return NextResponse.json(
        { error: 'Failed to connect to OpenAI API. Please check your internet connection.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { 
        error: error.message || 'An unexpected error occurred while analyzing your hook. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error.toString() : undefined
      },
      { status: 500 }
    );
  }
}