import { type AiTextGenerationOutput, type RoleScopedChatInput } from '@cloudflare/workers-types';
import type { RequestHandler } from './$types';

type AiTextGenerationOutputObject = {
    response?: string;
    tool_calls?: {
        name: string;
        arguments: unknown;
    }[];
}

const isAiTextGenerationOutputObject = (obj: AiTextGenerationOutput): obj is AiTextGenerationOutputObject => {
    if (obj instanceof ReadableStream) return false;
    return true;
}

export const GET: RequestHandler = async ({ platform }) => {
    const messages: RoleScopedChatInput[] = [
        { role: "system", content: 'Always respond with "Not my problem: <reason>", where <reason> is filled in with a bullshit excuse. You are an unhelpful, passive-agressive, snarky assistant working in the tech sector.' },
        {
            role: "user",
            content: "Respond",
        },
    ];

    const modelResponse = await platform?.env.AI.run("@cf/meta/llama-3-8b-instruct", {
        messages
    });

    if (!modelResponse) return Response.json({ error: "AI model returned empty response." }, { status: 500 });
    if (!isAiTextGenerationOutputObject(modelResponse)) return Response.json({ error: "AI model returned stream instead of string response." }, { status: 500 });

    const status = "Not my problem";
    const reason = modelResponse.response?.split(':')[1].trim();

    await platform?.env.DATABASE.exec(`INSERT INTO notmyproblems (status, reason) VALUES ("${status}", "${reason?.replace("\"", "\"\"")}")`);

    return Response.json({
        data: modelResponse,
        status,
        reason
    }, { status: 201 })
};
