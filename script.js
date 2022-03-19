const container = document.querySelector('#globalArea');

// CONTROLLER CONFIG
const controller = new GIO.Controller(container);

controller.setTransparentBackground(true);

controller.init();

const scene = controller.getScene();

const rotating = controller.getRotation();

// LINES GROUP
const linesGrey = new THREE.Group();
const linesWhite = new THREE.Group();
const linesRed = new THREE.Group();
const linesBlue = new THREE.Group();

scene.add(linesGrey, linesWhite, linesRed, linesBlue);
rotating.add(linesGrey, linesWhite, linesRed, linesBlue);

// FOR GREY LINES
Array(3)
  .fill()
  .forEach((val, index) => {
    const line = createLine(90, '#3a4757');
    line.position.x = 50 - 5 * index;
    line.rotation.y = (Math.PI / 3) * index;

    linesGrey.add(line);
  });

// FOR WHITE LINES
const whiteLine = createLine(90, '#fff');
whiteLine.position.x = 50 - 10;
whiteLine.rotation.y = -(Math.PI / 4);

linesWhite.add(whiteLine);

// FOR RED LINES
Array(3)
  .fill()
  .forEach((val, index) => {
    const line = createLine(90, '#512e2a');
    line.position.x = -50 + 5 * index;
    line.rotation.y = -(Math.PI / 3) * index;

    linesRed.add(line);
  });

// FOR SKY BLUE LINES
Array(2)
  .fill()
  .forEach((val, index) => {
    const line = createLine(90, '#7ab7cd');
    line.rotation.y = (Math.PI / 4) * index;
    line.position.x = 50 - 10;

    linesBlue.add(line);
  });

// COUNTRY PICK EVENT
controller.onCountryPicked(country => {});

function createLine(radius = 90, color = 'yellow') {
  const segments = 64, // 64
    material = new THREE.LineBasicMaterial({ color }),
    geometry = new THREE.CircleGeometry(radius, segments, 0, 2);

  geometry.vertices.shift();

  // Non closed circle with one open segment:
  const line = new THREE.Line(geometry, material);

  // Closed Loop
  // const line = new THREE.LineLoop(geometry, material);
  line.position.x = 60;

  scene.add(line);
  rotating.add(line);
  return line;
}

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button =>
  button.addEventListener('click', e => {
    button.classList.toggle('btn--disabled');

    const group = getLinesGroup(button);
    group.visible = !group.visible;
  })
);

function getLinesGroup(button) {
  switch (button.getAttribute('data-line-group')) {
    case 'red':
      return linesRed;
    case 'blue':
      return linesBlue;
    case 'grey':
      return linesGrey;
    case 'white':
      return linesWhite;
  }
}

const clock = new THREE.Clock();

const lineGroups = [linesBlue, linesGrey, linesWhite, linesRed];

function animate() {
  requestAnimationFrame(animate);

  const rotationFactor = Math.PI / 6;

  const elapsed = clock.getElapsedTime();
  lineGroups.forEach(group =>
    group.children.forEach(
      (line, index) =>
        (line.rotation.z = (index + 2) * elapsed * rotationFactor)
    )
  );
}

animate();
