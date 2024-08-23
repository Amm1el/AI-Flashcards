import {NextResponse} from 'next/server'
import OpenAI from 'openai'

const systemPrompt = `
1. You are a flashcard Creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines
2. Term/Concept Identification: Identify key terms, concepts, or questions that need to be remembered or understood.
3. Clear and Concise Content: Ensure each flashcard contains information that is clear, concise, and focused on a single idea or concept.
4. Front of Flashcard: Write a term, concept, or question on the front side of the flashcard.
5. Back of Flashcard: Provide the definition, explanation, or answer related to the front side of the flashcard.
6. Use Visuals Sparingly: Include images, diagrams, or symbols only when they enhance understanding, but keep visuals simple and relevant.
7. Simplify Language: Use simple and straightforward language to make the content easy to understand and memorize.
8. Use Examples: Where applicable, provide an example or scenario to illustrate the concept.
9. Relevance and Priority: Focus on information that is most relevant or frequently tested to prioritize studying.
10.Review and Edit: Review each flashcard for accuracy, clarity, and relevance, making necessary edits before finalizing.
11.Only generate 10 flashcards
Remember, the goal is to facilitate effective learning and retention of information through these flashcards.

Return in the following JSON format
{
        "flashcards":[{
            "front": "Front of card",
            "back": "Back of the card"
        }
    ]
}`

export async function POST(req){
    const openai = new OpenAI()
    const data = await req.text()

    const completion = await openai.chat.completions.create({
        messages: [
            {role: 'system', content: systemPrompt},
            {role: 'user', content: data},
        ],
        model: "gpt-3.5-turbo",
        response_format:{type: 'json_object'}
    })

    const flashcards = JSON.parse(completion.choices[0].message.content)

    return NextResponse.json(flashcards.flashcards)
}