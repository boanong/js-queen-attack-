const select = document.querySelectorAll('.row')
const alert = document.querySelector('.alert')
const alerts = document.querySelector('.alerterror')
const attack = document.querySelector('.btn1')
const reset = document.querySelector('.btn2')
reset.addEventListener('click', reloadPage)
attack.addEventListener('click', checkAttack)
let noSelected = 0
const selectedCell = []

function reloadPage () {
  window.location.reload()
}

for (let i = 0; i < select.length; i++) {
  select[i].addEventListener('click', selectPosition)
}

function selectPosition () {
  const id = this.getAttribute('id')

  const selectedIndex = selectedCell.indexOf(id)

  if (selectedIndex >= 0) {
    noSelected--
  } else if (noSelected < 1) {
    this.style.background = 'black'
    selectedCell.push(id)
    noSelected++
  } else if (noSelected < 2) {
    this.style.background = 'yellow'
    selectedCell.push(id)
    noSelected++
  } else {
    alert.textContent = ''
    alerts.textContent = ' You can only make two moves!'
  }
}

function attackFunction () {
  if (selectedCell.length !== 2) {
    alert.textContent = ''
    alerts.textContent = 'You will have to make two moves!'
  } else {
    const position1 = selectedCell[0]
    const position2 = selectedCell[1]

    const cell11 = position1.split('', position1)[0]
    const cell12 = position1.split('', position1)[1]

    const cell21 = position2.split('', position2)[0]
    const cell22 = position2.split('', position2)[1]

    if (cell11 === cell21) {
      return true
    }

    if (cell12 === cell22) {
      return true
    }

    if (cell11 - cell12 === cell21 - cell22) {
      return true
    }

    const positionRightLeft = Math.abs(parseInt(position1) - parseInt(position2))

    const moduleRightLeft = positionRightLeft % 9 === 0

    if (moduleRightLeft) {
      return true
    }
    alerts.textContent = 'A Queen cannot be attacked!'
  }
}

function checkAttack () {
  const attack = attackFunction()
  if (attack) {
    alerts.textContent = ''
    alert.textContent = 'A Queen has been attacked!!!'
  }
}
