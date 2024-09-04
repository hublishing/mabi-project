// Import the Firestore instance from firebase.js
import { db } from './firebase.js';

// 폼 제출 이벤트 처리
document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const dataInput = document.getElementById('dataInput').value;
    if (dataInput) {
        db.collection('data').add({
            content: dataInput
        }).then(() => {
            document.getElementById('output').innerText = "Data saved to Firebase!";
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    } else {
        document.getElementById('output').innerText = "Please enter some data.";
    }
});
