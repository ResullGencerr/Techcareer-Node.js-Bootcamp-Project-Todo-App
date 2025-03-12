document.addEventListener("DOMContentLoaded", () => {
    const todoForm = document.getElementById("todoForm");
    const todoInput = document.getElementById("todoInput");
    const errorMessage = document.getElementById("error-message")

    // Görev Ekleme
    todoForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = todoInput.value.trim();

        if (!name) {
            errorMessage.style.display = "block"; 
            setTimeout(() => {
                errorMessage.style.display = "none"; 
            }, 5000);
            return;
        }

        const response = await fetch("/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, isChecked: false, date: new Date().toISOString() }),
        });

        if (response.ok) {
            location.reload();
        }
    });

    // Silme ve Güncelleme İşlemleri
    document.getElementById("todoList").addEventListener("click", async (e) => {
        const li = e.target.closest("li");
        const todoId = li.getAttribute("data-id");

        // Görev Silme
        if (e.target.closest(".delete-btn")) {
            const response = await fetch(`/delete/${todoId}`, { method: "DELETE" });
            if (response.ok) {
                li.remove();
                location.reload();
               
            }
        }

        // Görev Güncelleme
        if (e.target.closest(".edit-btn")) {
            const newName = prompt("Yeni görev adını girin:", li.querySelector(".todo-name").textContent);
            if (newName) {
                const response = await fetch(`/edit/${todoId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: newName, isChecked: false, date: new Date().toISOString() }),
                });
                if (response.ok) {
                    li.querySelector(".todo-name").textContent = newName;
                    location.reload();
                }
            }
        }
    });
});
