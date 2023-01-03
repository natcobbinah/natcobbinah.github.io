const toggleHiddenDescription = (domElement,changeClickedBtnIcon) => {
    if (domElement.style.display === 'block') {
        domElement.style.display = 'none';
        domElement.style.transition = "display 1.5s ease-in 1.5s";
        changeClickedBtnIcon.innerHTML = '<i class="fa-solid fa-angle-right"></i>';
    } else {
        domElement.style.display = 'block';
        domElement.style.transition = "display 1.5s ease-in 1.5s";
        changeClickedBtnIcon.innerHTML = '<i class="fa-solid fa-angle-down"></i>';
    }
}

export {toggleHiddenDescription};