document.addEventListener("DOMContentLoaded", function () {
  const dropdown = document.getElementById("dropdown")
  const toggle = document.getElementById("dropdownToggle")
  const menu = document.getElementById("dropdownMenu")
  const items = menu.querySelectorAll(".dropdown-item")
  const selectedOption = document.getElementById("selectedOption")

  let isOpen = false

  function openDropdown() {
    isOpen = true
    dropdown.classList.add("open")
    toggle.classList.add("active")

    items.forEach(function (item) {
      item.classList.remove("focused")
    })
  }

  function closeDropdown() {
    isOpen = false
    dropdown.classList.remove("open")
    toggle.classList.remove("active")

    items.forEach(function (item) {
      item.classList.remove("focused")
    })
  }

  toggle.addEventListener("click", function (e) {
    e.preventDefault()
    e.stopPropagation()

    if (isOpen) {
      closeDropdown()
    } else {
      openDropdown()
    }
  })

  toggle.addEventListener("keydown", function (e) {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault()
        openDropdown()
        focusItem(0)
        break
      case "ArrowDown":
        e.preventDefault()
        openDropdown()
        focusItem(0)
        break
      case "ArrowUp":
        e.preventDefault()
        openDropdown()
        focusItem(items.length - 1)
        break
    }
  })

  items.forEach(function (item, index) {
    const link = item.querySelector("a")

    link.addEventListener("click", function (e) {
      e.preventDefault()
      const text = this.textContent
      selectItem(text)
      closeDropdown()
    })

    link.addEventListener("keydown", function (e) {
      switch (e.key) {
        case "Enter":
          e.preventDefault()
          const text = this.textContent
          selectItem(text)
          closeDropdown()
          toggle.focus()
          break
        case "ArrowDown":
          e.preventDefault()
          focusItem(index + 1)
          break
        case "ArrowUp":
          e.preventDefault()
          focusItem(index - 1)
          break
        case "Escape":
          e.preventDefault()
          closeDropdown()
          toggle.focus()
          break
        case "Tab":
          closeDropdown()
          break
      }
    })
  })

  document.addEventListener("click", function (e) {
    if (!dropdown.contains(e.target) && isOpen) {
      closeDropdown()
    }
  })

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen) {
      closeDropdown()
      toggle.focus()
    }
  })

  function focusItem(index) {
    items.forEach(function (item) {
      item.classList.remove("focused")
    })

    if (index < 0) {
      index = items.length - 1
    } else if (index >= items.length) {
      index = 0
    }

    items[index].classList.add("focused")
    items[index].querySelector("a").focus()

    items[index].scrollIntoView({
      block: "nearest",
      behavior: "smooth"
    })
  }

  function selectItem(text) {
    toggle.innerHTML = `${text} <span class="arrow">▼</span>`
    selectedOption.textContent = text
  }
})
