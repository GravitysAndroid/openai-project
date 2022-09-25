import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
	const completion = await openai.createCompletion({
		model: 'text-davinci-002',
		prompt: generatePrompt(req.body.topic),
		temperature: 0.6,
	});
	res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(topic) {
	const capitalizedTopic =
		topic[0].toUpperCase() + topic.slice(1).toLowerCase();
	return `Write a two sentence long horror story about a character.

Topic: Creepy
Story: I wake up in a dark room. I can't see anything, but I can feel something crawling on my skin.
Topic: eerie
Story: I can't see the stars anymore. They've been replaced by a single, unblinking eye that watches me from the sky.
Topic: ${capitalizedTopic}
Story:`;
}
