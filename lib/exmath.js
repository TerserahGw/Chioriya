const generateNoobQuestion = () => {
    const num1 = Math.floor(Math.random() * 10); 
    const num2 = Math.floor(Math.random() * 10);
    const operation = Math.random() > 0.5 ? '+' : '-';
    const question = `${num1} ${operation} ${num2}`;
    const answer = operation === '+' ? num1 + num2 : num1 - num2;
    return { question, answer };
};

const generateVeasyQuestion = () => {
    const num1 = Math.floor(Math.random() * 1000);
    const num2 = Math.floor(Math.random() * 1000);
    const operation = Math.random() > 0.5 ? '+' : '-';
    const question = `${num1} ${operation} ${num2}`;
    const answer = operation === '+' ? num1 + num2 : num1 - num2;
    return { question, answer };
};

const generateEasyQuestion = () => {
    const num1 = Math.floor(Math.random() * 1000) - 500;
    const num2 = Math.floor(Math.random() * 1000) - 500;
    const operation = Math.random() > 0.5 ? '+' : '-';
    const question = `${num1} ${operation} ${num2}`;
    const answer = operation === '+' ? num1 + num2 : num1 - num2;
    return { question, answer };
};

const generateNormalQuestion = () => {
    const z = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    const x = 8 * z + 1 * y;
    return { question: `x = 8z + 1y; x for z=${z}, y=${y}`, answer: x };
};

const generateHardQuestion = () => {
    const angle = Math.floor(Math.random() * 90);
    const operation = Math.random() > 0.5 ? 'sin' : 'cos';
    const question = `${operation}(${angle}°)`;
    const answer = operation === 'sin' ? Math.sin(angle * (Math.PI / 180)) : Math.cos(angle * (Math.PI / 180));
    return { question, answer };
};

const generateProQuestion = () => {
    const operation = Math.floor(Math.random() * 3);
    let question, answer;

    if (operation === 0) {
        const angle = Math.floor(Math.random() * 360);
        question = `Calculate: sin(x) + cos(y) = sin(${angle}°) + cos(${angle}°); find x when y=${angle}`;
        answer = (Math.sin(angle * (Math.PI / 180)) + Math.cos(angle * (Math.PI / 180))).toFixed(2);
    } else if (operation === 1) {
        const y = Math.floor(Math.random() * 90);
        question = `Solve: tan(y) = 1; what is y?`;
        answer = `${45 + y}°`;
    } else {
        const z = Math.floor(Math.random() * 10);
        question = `Solve: 2x + 3sin(z) = 6; find x when z=${z}`;
        answer = (3 - 3 * Math.sin(z * (Math.PI / 180)) / 2).toFixed(2);
    }

    return { question, answer };
};

const generateExQuestion = () => {
    const operation = Math.floor(Math.random() * 3);
    let question, answer;

    if (operation === 0) {
        const n1 = 1; 
        const n2 = 1.5; 
        const angleOfIncidence = Math.floor(Math.random() * 90);
        question = `Using Snell's Law: n1=${n1}, n2=${n2}, angle of incidence=${angleOfIncidence}°; find angle of refraction.`;
        answer = Math.asin((n1 / n2) * Math.sin(angleOfIncidence * (Math.PI / 180))) * (180 / Math.PI);
    } else if (operation === 1) {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const c = Math.floor(Math.random() * 10) + 1;
        question = `Find the roots of: ${a}x² + ${b}x + ${c} = 0`;
        const discriminant = b ** 2 - 4 * a * c;
        if (discriminant < 0) {
            answer = "No real roots.";
        } else if (discriminant === 0) {
            answer = (-b / (2 * a)).toFixed(2);
        } else {
            answer = `${((-b + Math.sqrt(discriminant)) / (2 * a)).toFixed(2)}, ${((-b - Math.sqrt(discriminant)) / (2 * a)).toFixed(2)}`;
        }
    } else {
        const m1 = Math.floor(Math.random() * 100) + 1;
        const m2 = Math.floor(Math.random() * 100) + 1;
        const r = Math.floor(Math.random() * 50) + 1;
        question = `Using the formula: F = G(m1*m2)/r², calculate the force for m1 = ${m1}, m2 = ${m2}, r = ${r}.`;
        const G = 6.67430e-11;
        answer = (G * (m1 * m2) / (r ** 2)).toExponential(2);
    }

    return { question, answer };
};

const getRandomQuestion = (level) => {
    switch (level) {
        case 'noob':
            return generateNoobQuestion();
        case 'veasy':
            return generateVeasyQuestion();
        case 'easy':
            return generateEasyQuestion();
        case 'normal':
            return generateNormalQuestion();
        case 'hard':
            return generateHardQuestion();
        case 'pro':
            return generateProQuestion();
        case 'ex':
            return generateExQuestion();
        default:
            throw new Error('Tingkat kesulitan tidak valid.');
    }
};

const handlerMath = async (level) => {
    if (!['noob', 'veasy', 'easy', 'normal', 'hard', 'pro', 'ex'].includes(level)) {
        throw `Tingkat kesulitan tidak ditemukan. Pilih antara: noob, veasy, easy, normal, hard, pro, ex.`;
    }

    const selectedQuestion = getRandomQuestion(level);
    return { question: selectedQuestion.question, answer: selectedQuestion.answer };
};

module.exports = {
    handlerMath
};
