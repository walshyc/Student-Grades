let rows = document.getElementsByTagName('tr');
let countSpan = document.getElementById('count');
document.addEventListener('DOMContentLoaded', function () {
  update();
});

const update = () => {
  const array = [...rows];
  let emptyCount = 0;
  array.shift();
  array.forEach((row, i) => {
    let score = 0;
    let count = 0;

    let allEmpty = true;
    const children = [...row.children];
    children.forEach((c) => {
      if (c.className == 'score') {
        if (parseInt(c.innerHTML) >= 0 && parseInt(c.innerHTML) <= 100) {
          count++;
          allEmpty = false;
          i % 2 == 0
            ? (c.style.background = 'ivory')
            : (c.style.background = 'beige');
          //console.log(parseInt(c.innerHTML));
          score += parseInt(c.innerHTML);
        } else {
          c.style.background = 'yellow';
          emptyCount++;
          c.innerHTML = '-';
        }
        //console.log(c);
      }
    });

    countSpan.innerHTML = emptyCount;

    let average = (score / count).toFixed();
    if (allEmpty) {
      row.lastElementChild.innerHTML = 0;
    } else {
      row.lastElementChild.innerHTML = average;
      if (average < 60) {
        row.lastElementChild.style.background = 'red';
        row.lastElementChild.style.color = 'white';
      } else {
        i % 2 == 0
          ? (row.lastElementChild.style.background = 'ivory')
          : (row.lastElementChild.style.background = 'beige');

        row.lastElementChild.style.color = 'black';
      }
    }
  });
};

const array = [...rows];
array.shift();
// https://stackoverflow.com/questions/1391278/contenteditable-change-events
array.forEach((row) => {
  row.addEventListener(
    'input',
    function () {
      update();
    },
    false
  );
});
