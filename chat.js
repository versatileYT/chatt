document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    const apiKey = "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";
    const apiUrl = "https://api.openai.com/v1/engines/davinci-codex/completions";

    sendButton.addEventListener("click", function () {
        const userMessage = userInput.value.trim();
        if (!userMessage) return;

        // Очистить ввод пользователя
        userInput.value = "";

        // Отобразить сообщение пользователя в чате
        chatBox.innerHTML += `<div class="user-message">${userMessage}</div>`;

        // Отправить запрос к API OpenAI
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                prompt: userMessage,
                max_tokens: 50, // Максимальное количество токенов в ответе
            }),
        })
        .then(response => response.json())
        .then(data => {
            // Отобразить ответ от OpenAI в чате
            const aiMessage = data.choices[0].text;
            chatBox.innerHTML += `<div class="ai-message">${aiMessage}</div>`;
        })
        .catch(error => {
            console.error("Ошибка при отправке запроса к OpenAI API:", error);
        });
    });
});
