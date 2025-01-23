class SpeechRecognitionTool {
    constructor() {
        this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        this.transcriptArea = document.getElementById('transcript');
        this.feedbackArea = document.getElementById('pronunciation-feedback');
        this.startButton = document.getElementById('start-recording');
        this.stopButton = document.getElementById('stop-recording');
        
        this.setupRecognition();
        this.setupEventListeners();
    }

    setupRecognition() {
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
    }

    setupEventListeners() {
        this.startButton.addEventListener('click', () => this.startRecording());
        this.stopButton.addEventListener('click', () => this.stopRecording());

        this.recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('');
            this.transcriptArea.value = transcript;
        };

        this.recognition.onend = () => {
            this.stopButton.disabled = true;
            this.startButton.disabled = false;
        };
    }

    startRecording() {
        this.transcriptArea.value = '';
        this.feedbackArea.innerHTML = 'Listening...';
        this.recognition.start();
        this.startButton.disabled = true;
        this.stopButton.disabled = false;
    }

    stopRecording() {
        this.recognition.stop();
        this.feedbackArea.innerHTML = 'Processing your speech...';
        this.startButton.disabled = false;
        this.stopButton.disabled = true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SpeechRecognitionTool();
});