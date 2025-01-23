class PronunciationChecker {
    constructor() {
        this.transcript = document.getElementById('transcript');
        this.feedbackArea = document.getElementById('pronunciation-feedback');
    }

    checkPronunciation(text) {
        const commonPronunciationChallenges = {
            'schedule': 'Try pronouncing as "sked-jool"',
            'pronunciation': 'Focus on clear syllable separation',
            'comfortable': 'Stress the first syllable: "KUMF-ter-bul"',
            'vegetable': 'Pronounce as "VEJ-tuh-bul"'
        };

        let feedback = [];
        
        Object.entries(commonPronunciationChallenges).forEach(([word, tip]) => {
            if (text.toLowerCase().includes(word)) {
                feedback.push(`Word "${word}": ${tip}`);
            }
        });

        this.displayFeedback(feedback);
    }

    displayFeedback(feedbackList) {
        if (feedbackList.length > 0) {
            this.feedbackArea.innerHTML = `
                <h3>Pronunciation Tips:</h3>
                <ul>
                    ${feedbackList.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            `;
        } else {
            this.feedbackArea.innerHTML = 'No specific pronunciation feedback at this time.';
        }
    }
}

const pronunciationChecker = new PronunciationChecker();
document.getElementById('stop-recording').addEventListener('click', () => {
    setTimeout(() => {
        pronunciationChecker.checkPronunciation(
            document.getElementById('transcript').value
        );
    }, 500);
});