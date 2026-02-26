import React, { useEffect, useState } from 'react';
import questionsData from '../../data/questions.json';
import {
  Container,
  Progress,
  Button,
  Text,
  Paper,
  Stack,
  Title,
  Group,
} from '@mantine/core';

type Question = {
  id: string;
  question: string;
  answers: string[];
};

const PlantTrivia: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answeredIds, setAnsweredIds] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const restartQuiz = () => {
    setAnsweredIds([]);
    setCorrectCount(0);
    setIncorrectCount(0);
    setSelectedAnswer(null);
    pickNextQuestion();
  };

  useEffect(() => {
    setQuestions(questionsData);
  }, []);

  useEffect(() => {
    pickNextQuestion();
  }, [questions, answeredIds]);

  const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
  };
  const shuffledAnswers = currentQuestion ? shuffleArray(currentQuestion.answers) : [];

  const pickNextQuestion = () => {
    const remaining = questions.filter(q => !answeredIds.includes(q.id));
    if (remaining.length === 0) {
      setCurrentQuestion(null);
      return;
    }
    const randomIndex = Math.floor(Math.random() * remaining.length);
    setCurrentQuestion(remaining[randomIndex]);
    setSelectedAnswer(null);
  };

  const handleAnswer = (answer: string) => {
    if (!currentQuestion) return;
    setSelectedAnswer(answer);
    const isCorrect = answer === currentQuestion.answers[0];
    setAnsweredIds([...answeredIds, currentQuestion.id]);
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    } else {
      setIncorrectCount(prev => prev + 1);
    }
  };

  const progress = (answeredIds.length / questions.length) * 100;

  return (
    <Container fluid size="sm" px="0" py="xl">
      <Stack spacing="md">
        <Title order={2}>Try Some Plant Trivia!</Title>

        <Progress value={progress} size="md" radius="xl" />
        <Text>{answeredIds.length} / {questions.length} answered</Text>

        <Group>
          <Text>✅ Correct: {correctCount}</Text>
          <Text>❌ Incorrect: {incorrectCount}</Text>
        </Group>

        {currentQuestion ? (
          <Paper shadow="sm" p="md" withBorder style={{ minHeight: '275px' }}>
            <Title order={4}>{currentQuestion.question}</Title>
            <Stack mt="sm">
              {shuffledAnswers.map((ans, idx) => (
                <Button
                  fullWidth
                  key={idx}
                  onClick={() => handleAnswer(ans)}
                  disabled={!!selectedAnswer}
                  variant={
                    selectedAnswer === ans
                      ? ans === currentQuestion.answers[0]
                        ? 'light'
                        : 'outline'
                      : 'default'
                  }
                  color={
                    selectedAnswer === ans
                      ? ans === currentQuestion.answers[0]
                        ? 'green'
                        : 'red'
                      : 'gray'
                  }
                  styles={{
                    root: {
                      height: 'auto',
                      padding: '12px 16px',
                    },
                    label: {
                      whiteSpace: 'normal',
                      textAlign: 'left',
                    },
                  }}
                >
                  {ans}
                </Button>
              ))}
            </Stack>
          </Paper>
        ) : (
          <Paper shadow="sm" p="md" withBorder style={{ minHeight: '275px' }}>
            <Title order={3}>🎉 You have answered all of the questions!</Title>
            <Button mt="md" onClick={restartQuiz} variant="filled" color="green">
              Restart Quiz
            </Button>
          </Paper>
        )}
      </Stack>
    </Container>
  );
};

export default PlantTrivia;