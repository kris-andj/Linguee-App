/*import React, { useState, useEffect } from 'react';
import { axiosInstance, getCurrentUser } from '../services//apiService'; // Koristimo getCurrentUser iz apiService
import { setToken, getToken, removeToken, isAuthenticated} from '../services/AuthService';

const MilionerKviz = () => {
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const user = await getCurrentUser();
                setCurrentUser(user);
            } catch (error) {
                console.error('Greška pri dobavljanju trenutno prijavljenog korisnika:', error);
            }
        };

        fetchCurrentUser();
    }, []);

    const handleAnswerSelect = (questionId, answerId) => {
        setSelectedAnswers({ ...selectedAnswers, [questionId]: answerId });
    };

    const handleSubmitQuiz = async () => {
        const results = {
            ucenikId: currentUser.id,
            questions: questions.map(q => ({
                questionId: q.id,
                answerId: selectedAnswers[q.id] || null,
            })),
        };

        try {
            const response = await axiosInstance.post('QuizMilioner/SaveResult', results);
            console.log('Rezultat sačuvan na backend-u:', response.data);
            setQuizCompleted(true);
        } catch (error) {
            console.error('Greška prilikom čuvanja rezultata:', error);
        }
    };

    if (!currentUser) {
        return <div>Učitavanje...</div>;
    }

    if (quizCompleted) {
        return <div>Kviz je završen. Hvala što ste učestvovali!</div>;
    }

    return (
        <div>
            <h1>Milioner Kviz</h1>
            {questions.map(question => (
                <div key={question.id}>
                    <h3>{question.text}</h3>
                    <ul>
                        {question.answers.map(answer => (
                            <li key={answer.id}>
                                <label>
                                    <input
                                        type="radio"
                                        name={`question_${question.id}`}
                                        value={answer.id}
                                        onChange={() => handleAnswerSelect(question.id, answer.id)}
                                    />
                                    {answer.answerText}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <button onClick={handleSubmitQuiz}>Završi kviz</button>
        </div>
    );
};

export default MilionerKviz;
*/