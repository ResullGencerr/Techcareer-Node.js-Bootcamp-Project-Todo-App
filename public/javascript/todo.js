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

    // Checkbox Güncelleme (isChecked true/false yapma)
    document.getElementById("todoList").addEventListener("change", async (e) => {
        if (e.target.classList.contains("todo-checkbox")) {
            const li = e.target.closest("li");
            const todoId = li.getAttribute("data-id");
            const isChecked = e.target.checked; 

            const response = await fetch(`/toggle/${todoId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isChecked }),
            });

            if (response.ok) {
                li.querySelector(".todo-name").classList.toggle("completedTask", isChecked);
            }
        }
    });

    // Silme ve Güncelleme İşlemleri
    document.getElementById("todoList").addEventListener("click", async (e) => {
        const li = e.target.closest("li");
        const todoId = li.getAttribute("data-id");
        const todoName = li.querySelector(".todo-name").textContent;

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
            const modal = document.getElementById("editModal");
            const editInput = document.getElementById("editInput");
            modal.style.display = "block";
            editInput.value = todoName;
            document.querySelector(".close").onclick = function () {
            modal.style.display = "none";  };
            document.getElementById("saveEdit").onclick = async function () {
                const newName = editInput.value;
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
                 modal.style.display = "none"
        }
    };
    });

    //Tum Gorevleri Silme
    document.getElementById("deleteAll").addEventListener("click", async () => {
        if (!confirm("Tüm görevleri silmek istediğinize emin misiniz?")) return;
    
        const response = await fetch("/delete-all", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
    
        if (response.ok) {
            location.reload();
        } else {
            alert("Silme işlemi başarısız!");
        }
    });
    
});
