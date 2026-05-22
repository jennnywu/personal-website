const projectOrder = [
    "vocalpoint-modal",
    "velocimetry-modal",
    "adapter-modal",
    "boxdj-modal",
    "rccar-modal",
    "handrehab-modal",
    "ebike-modal",
    "snailtype-modal",
    "cafe-modal",
    "pomodoro-modal",
    "sslchecker-modal"
];

function populateTags() {
    document.querySelectorAll(".project, .exp-card").forEach(project => {
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

function navigateProject(direction) {
    if (window.innerWidth <= 1850) return;
    const activeModal = document.querySelector(".modal.active");
    if (!activeModal) return;
    const current = projectOrder.indexOf(activeModal.id);
    if (current === -1) return;
    closeModal(activeModal.id);
    const nextIndex = direction === "next"
        ? (current + 1) % projectOrder.length
        : (current - 1 + projectOrder.length) % projectOrder.length;
    openModal(projectOrder[nextIndex]);
}

function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    const project = document.querySelector(`[onclick="openModal('${id}')"]`);
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
    const prevBtn = modal.querySelector(".prev");
    const nextBtn = modal.querySelector(".next");
    if (prevBtn) {
        prevBtn.onclick = e => {
            e.stopPropagation();
            navigateProject("prev");
        };
    }
    if (nextBtn) {
        nextBtn.onclick = e => {
            e.stopPropagation();
            navigateProject("next");
        };
    }
    modal.classList.add("active");
    updateModalScroll(modal);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove("active");
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
}

document.querySelector(".dropbtn")?.addEventListener("click", function(e) {
    e.stopPropagation();
    document.querySelector(".dropdown")?.classList.toggle("open");
});

document.querySelectorAll(".dropdown-content a").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelector(".dropdown")?.classList.remove("open");
    });
});

document.addEventListener("keydown", function(e) {
    const activeModal = document.querySelector(".modal.active");
    if (activeModal && window.innerWidth > 1850) {
        if (e.key === "ArrowLeft") {
            navigateProject("prev");
            return;
        }
        if (e.key === "ArrowRight") {
            navigateProject("next");
            return;
        }
    }
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
    if (!e.target.closest(".dropdown")) {
        document.querySelector(".dropdown")?.classList.remove("open");
    }
});

document.querySelectorAll(".modal-content").forEach(content => {
    content.addEventListener("wheel", function(e) {
        const atTop = this.scrollTop === 0;
        const atBottom = this.scrollHeight - this.scrollTop <= this.clientHeight + 1;

        if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
            e.preventDefault();
        }
    }, { passive: false });
});

document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("wheel", function(e) {
        if (!e.target.closest(".modal-content")) {
            e.preventDefault();
        }
    }, { passive: false });
});

function updateModalScroll(modal) {
    const content = modal.querySelector(".modal-content");

    if (!content) return;

    content.style.overflowY = "hidden";
    content.scrollTop = 0;

    requestAnimationFrame(() => {
        const needsScroll = content.scrollHeight > content.clientHeight + 10;
        content.style.overflowY = needsScroll ? "auto" : "hidden";
    });
}

populateTags();