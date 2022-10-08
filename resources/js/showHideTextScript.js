const toggleHiddenDescription = (domElement,changeClickedBtnIcon) => {
    if (domElement.style.display === 'block') {
        domElement.style.display = 'none';
        changeClickedBtnIcon.innerHTML = '<i class="fa-solid fa-angle-right"></i>';
    } else {
        domElement.style.display = 'block';
        changeClickedBtnIcon.innerHTML = '<i class="fa-solid fa-angle-down"></i>';
    }
}

export {toggleHiddenDescription};