function populateTags() {
    document.querySelectorAll(".project").forEach(project => {
        const tags = project.dataset.tags?.split(",");
        const projectTags = project.querySelector(".project-tags");

        if (tags && projectTags) {
            projectTags.innerHTML = "";

            tags.forEach(tag => {
                const span = document.createElement("span");
                span.textContent = tag.trim();
                projectTags.appendChild(span);
            });
        }
    });
}

function openModal(id) {
    const modal = document.getElementById(id);

    if (!modal) return;

    const project = document.querySelector(
        `[onclick="openModal('${id}')"]`
    );

    if (project) {
        const tags = project.dataset.tags?.split(",");
        const modalTags = modal.querySelector(".modal-tags");

        if (tags && modalTags) {
            modalTags.innerHTML = "";

            tags.forEach(tag => {
                const span = document.createElement("span");
                span.textContent = tag.trim();
                modalTags.appendChild(span);
            });
        }
    }

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeModal(id) {
    const modal = document.getElementById(id);

    if (!modal) return;

    modal.classList.remove("active");

    const activeModals = document.querySelectorAll(".modal.active");

    if (activeModals.length === 0) {
        document.body.style.overflow = "";
    }
}

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        document.querySelectorAll(".modal.active").forEach(modal => {
            closeModal(modal.id);
        });

        document.querySelector(".dropdown")?.classList.remove("open");
        document.querySelector(".dropbtn")?.blur();
    }
});

document.addEventListener("click", function(e) {
    document.querySelectorAll(".modal.active").forEach(modal => {
        if (e.target === modal) {
            closeModal(modal.id);
        }
    });
});

populateTags();