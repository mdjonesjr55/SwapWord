async function swapWord() {
    let word = document.getElementById('inputWord').value.trim().toLowerCase();
    let errorMessage = document.getElementById('error-message');
    errorMessage.textContent = ''; // Clear previous error message

    // Check if the input contains numbers or symbols
    if (/[^a-zA-Z ]/.test(word)) {
        errorMessage.textContent = "❌ Please enter only letters (no numbers or symbols).";
        document.getElementById('result').textContent = '';
        document.getElementById('suggestions').textContent = '';
        return;
    }

    // Check if the word contains more than one word
    if (word.split(" ").length > 1) {
        errorMessage.textContent = "❌ Please enter only one word!";
        document.getElementById('result').textContent = '';
        document.getElementById('suggestions').textContent = '';
        return;
    }

    if (!word) {
        document.getElementById('result').textContent = "❌ Please enter a word!";
        document.getElementById('suggestions').textContent = "";
        return;
    }

    // Check if the word is a proper noun or a very specific name/place
    const isProperNoun = /^[A-Z][a-z]+$/.test(word); // Checks if the first letter is capitalized (simple check for names or places)

    if (isProperNoun) {
        document.getElementById('result').textContent = `"${word}" seems like a name or place, no suggestions available.`;
        document.getElementById('suggestions').textContent = "";
        return;
    }

    try {
        // Use Datamuse API to get words that are similar or related to the input word
        let response = await fetch(`https://api.datamuse.com/words?ml=${word}&max=5`);
        let data = await response.json();

        if (data.length > 0) {
            let alternatives = data.map(entry => entry.word).join(", ");
            
            document.getElementById('result').innerHTML = `Here are some suggestions for "<b>${word}</b>":`;
            document.getElementById('suggestions').innerHTML = `<b>Suggested words:</b> ${alternatives}`;
        } else {
            document.getElementById('result').textContent = `"${word}" doesn't seem to have any synonyms. Try a different word!`;
            document.getElementById('suggestions').textContent = "";
        }
    } catch (error) {
        document.getElementById('result').textContent = "⚠️ Error fetching data. Try again later!";
        console.error("API Error:", error);
    }
}
