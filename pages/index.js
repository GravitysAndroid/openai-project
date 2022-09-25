import Head from 'next/head';
import { useState } from 'react';
import styles from './index.module.css';

export default function Home() {
	const [topicInput, setTopicInput] = useState('');
	const [result, setResult] = useState();

	async function onSubmit(event) {
		event.preventDefault();
		const response = await fetch('/api/generate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ topic: topicInput }),
		});
		const data = await response.json();
		console.log(data);

		setResult(data.result);
		setTopicInput('');
	}

	return (
		<div>
			<Head>
				<title>Hayden's OpenAI App</title>
				<link rel="icon" href="/rocket.png" />
			</Head>

			<main className={styles.main}>
				<img src="/rocket.png" className={styles.icon} />
				<h3>Enter a topic to write a short horror story</h3>
				<form onSubmit={onSubmit}>
					<input
						type="text"
						name="topic"
						placeholder="Enter a topic"
						value={topicInput}
						onChange={(e) => setTopicInput(e.target.value)}
					/>
					<input type="submit" value="Generate story" />
				</form>
				<div className={styles.result}>{result}</div>
			</main>
		</div>
	);
}
