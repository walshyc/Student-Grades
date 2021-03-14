// Browser: Mozilla Firefox Developer Edition
// Operating System: Windows 10
// Browser Version: 87.0b5
// Also tested in Google Chrome version 88.0.4324.190

// Global Variables
let allRows = document.getElementsByTagName('tr');
let countSpan = document.getElementById('count');
const tableBody = document.getElementById('tableBody');
const studentname = document.getElementById('studentname');
const id = document.getElementById('studentid');
let averageDiv;
let newTable = []; // empty table
let globalData = []; // array to store the global student data
let columnCount = 7; // variable to keep track fo the number of columns
let defaultData = {}; // object to store any new columns
let newColumnTitle = '';
let averageDisplay = 'PERCENT';

// fucntions called on page load
document.addEventListener('DOMContentLoaded', function () {
  createTableData(10);
  createTableStructure();
  update();
  addCookie();
  retreiveCookie();

  //update();
});

// function to add the data to a cookie
const addCookie = () => {
  const data = JSON.stringify(globalData);
  document.cookie = 'd=' + data;
};

// function to retreive data from cookie
// source https://stackoverflow.com/questions/4825683/how-do-i-create-and-read-a-value-from-cookie
const retreiveCookie = () => {
  let name = 'd=';
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return '';
};

// function to create a random student number
// source: John Keating notes
const createStudentNumber = (number) => {
  return [...Array(number)].map(() => Math.floor(Math.random() * 10)).join('');
};

// function to create a random grade between 0 & 100
// source: John Keating notes
const getGrade = () => {
  return Math.round(Math.random() * 99) + 1;
};

// function to create the data to be used in the table
// number of rows to be created is passed as a parameter
// code inspried from John Keating notes
const createTableData = (rows) => {
  // loop to create data for the number of rows specified
  for (let index = 0; index < rows; index++) {
    let data = {
      'Student Name': generateRandomName(),
      'Student ID': createStudentNumber(7),
      'Assignment 1': '-',
      'Assignment 2': '-',
      'Assignment 3': '-',
      'Assignment 4': '-',
      'Assignment 5': '-',
      'Average (%)': 0,
    };
    globalData.push(data); // adds each object created to the global data array
  }
};

// function to create a new row
// student name and ID are optional parameters
const createNewrow = (studentName = '', id = '') => {
  let data = {
    'Student Name': studentName.length > 1 ? studentName : generateRandomName(), // use student name if passed othewise generate a random name
    'Student ID': id.length > 1 ? id : createStudentNumber(7), // use student id if passed othewise generate a random id
    'Assignment 1': '-',
    'Assignment 2': '-',
    'Assignment 3': '-',
    'Assignment 4': '-',
    'Assignment 5': '-',
    ...defaultData, // add any other columns should they have been created after new row
    'Average (%)': 0,
  };

  return data;
};

// function to create the table HTML structure
// code inspried from John Keating notes
const createTableStructure = () => {
  let columnHeaders = Object.keys(globalData[0]);
  let table = document.createElement('table');

  let tableRow = table.insertRow(-1);

  for (let index = 0; index < columnHeaders.length; index++) {
    // create a heading for all columns that arn't average
    if (columnHeaders[index] !== 'Average (%)') {
      const tableHeading = document.createElement('th');

      tableHeading.innerHTML = columnHeaders[index];
      tableHeading.setAttribute('onclick', 'selectCol(this)'); // adds onlick for highlighting column
      tableRow.appendChild(tableHeading);
    }
  }
  // creates average colum with different attributes to the other columns
  const averageHeading = document.createElement('th');
  averageHeading.innerHTML = 'Average (%)';
  averageHeading.id = 'average';
  tableRow.appendChild(averageHeading);

  // loop to create the rows
  for (let index = 0; index < globalData.length; index++) {
    tableRow = table.insertRow(-1);

    let assignment;
    for (let j = 0; j < columnHeaders.length; j++) {
      switch (j) {
        case 2:
          assignment = 'Assignment 1';
          break;
        case 3:
          assignment = 'Assignment 2';
          break;
        case 4:
          assignment = 'Assignment 3';
          break;
        case 5:
          assignment = 'Assignment 4';
          break;
        case 6:
          assignment = 'Assignment 5';
          break;

        default:
          assignment = newColumnTitle;
          break;
      }
      let tableCell = tableRow.insertCell(-1);
      // set name cell attributes
      if (j == 0) {
        tableCell.id = 'studentname';
        tableCell.setAttribute('onclick', 'selectRow(this)');
      }
      // set id cell attributes
      if (j == 1) {
        tableCell.id = 'studentid';
      }
      // set assignment cell attributes
      if (j > 1 && j < columnCount) {
        tableCell.setAttribute('id', 'score');
        tableCell.setAttribute('contenteditable', 'true'); // allows the div to be edited by the user
        tableCell.setAttribute('oninput', 'handleUpdate()'); // adds the oninput listener to the div
      }
      // set average cell attributes
      if (j == columnCount) {
        tableCell.setAttribute('class', 'average');
        tableCell.setAttribute('average', parseInt(tableCell.innerHTML));
      }
      // set the cell innerHTML
      tableCell.innerHTML = globalData[index][columnHeaders[j]];
      tableCell.setAttribute('dataScore', parseInt(tableCell.innerHTML));
      tableCell.setAttribute('dataAssignment', assignment);
    }
  }

  let tableDiv = document.getElementById('table'); // access the empty table div
  tableDiv.innerHTML = ''; // clear it incase it contained any HTML
  tableDiv.appendChild(table); // add the new table
  averageDiv = document.getElementById('average');
  averageDiv.setAttribute('onclick', 'averageChange()'); // add onclick to avergae div for changing averages
};

// function to generate a random name
// source - John Keating notes
const generateRandomName = () => {
  const firstNames = `Conor
        Daniel
        Adam
        Liam
        Tadhg
        Luke
        Charlie
        Darragh
        Harry
        Oisín
        Michael
        Alex
        Fionn
        Cillian
        Thomas
        Jamie
        Patrick
        Rían
        Finn
        Seán
        Oliver
        Ryan
        Dylan
        Emily
        Grace
        Fiadh
        Sophie
        Hannah
        Amelia
        Ava
        Ellie
        Ella
        Mia
        Lucy
        Emma
        Lily
        Olivia
        Chloe
        Aoife
        Caoimhe
        Molly
        Anna
        Sophia
        Holly
        Freya
        Saoirse
        Kate
        Sadie
        Robyn
        Katie
        Ruby
        Evie
        Éabha
        Cara
        `.split(/\n/);

  const lastNames = `Murphy
        Kelly
        Sullivan
        Walsh
        Smith
        O'Brien
        Byrne
        Ryan
        Connor
        O'Neill
        Reilly
        Doyle
        McCarthy
        Gallagher
        Doherty
        Kennedy
        Lynch
        Murray
        Quinn
        Moore
        McLaughlin
        Carroll
        Connolly
        Daly
        Connell
        Wilson
        Dunne
        Brennan
        Burke
        Collins
        Campbell
        Clarke
        Johnston
        Hughes
        Farrell`.split(/\n/);
  Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)];
  };

  Array.prototype.shuffle = function () {
    var i = this.length,
      j,
      temp;
    if (i == 0) return this;
    while (--i) {
      j = Math.floor(Math.random() * (i + 1));
      temp = this[i];
      this[i] = this[j];
      this[j] = temp;
    }
    return this;
  };

  return firstNames.sample().trim() + ' ' + lastNames.sample().trim();
};

// function to update a cell & globalData when a new value is typed
const updateCell = (studentId, assignment, newvalue, cell) => {
  cell.setAttribute('dataScore', parseInt(newvalue)); // adds the new value to the 'dataScore' attribute of the cell
  if (assignment.length > 1) {
    // search through the globalData array for the correct student to update
    const person = globalData.find((student) => {
      if (student['Student ID'] == studentId) {
        student[assignment] = newvalue; // sets the new value to the correct assignment in the globalData
      }
    });

    return person;
  }
};

// function to add a new column to each student in the global data array
const addNewCol = (newCol) => {
  globalData.forEach((student) => {
    return { ...student, [newCol]: '-' }; // add the new column as the key and initalise the value as '-'
  });
  return globalData;
};

// function to update the cell and average
const update = () => {
  const array = [...allRows]; // convert the HTML collection to array
  let emptyCount = 0; // variable to track the number of empty assingments
  array.shift(); // remove the headings row from the array

  // loopp through each row
  array.forEach((row, i) => {
    // initalise starting variables
    let score = 0;
    let count = 0;
    let studentId;

    const children = [...row.children]; // create array for each rows children elements
    // loopp through each child
    children.forEach((c, index) => {
      // set the student id HTML
      if (c.id == 'studentid') {
        studentId = c.innerHTML;
      }
      // check if the child is an assignment cell
      if (c.id == 'score') {
        count++; // incearse the count
        // ensure that only values between 0 & 100 are allowed
        if (parseInt(c.innerHTML) >= 0 && parseInt(c.innerHTML) <= 100) {
          // correctly set the alignment & background colour for every second cell as per requirements
          i % 2 == 0
            ? (c.style.background = 'beige')
            : (c.style.background = 'ivory');
          c.style.textAlign = 'right';
          c.innerHTML = c.innerHTML.replace('-', ''); // remove the '-'
          //update the cell
          updateCell(
            studentId,
            c.attributes.dataassignment.value,
            parseInt(c.innerHTML),
            c
          );
          score += parseInt(c.innerHTML); // adds the value to the current score
        } else {
          // if the cell is no valid set the cell attributes as per requirements
          score += 0;
          c.style.background = 'yellow';
          c.style.textAlign = 'center';
          emptyCount++; // increase the count of empty assignments
          c.innerHTML = '-';
        }
        // When entering a value I was experiencing that the digits were displaying from right to left
        //found this code below to help solve this issue from
        //https://stackoverflow.com/questions/1125292/how-to-move-cursor-to-end-of-contenteditable-entity

        // select all the content in the element
        document.execCommand('selectAll', false, null);
        // collapse selection to the end
        document.getSelection().collapseToEnd();
      }
    });

    countSpan.innerHTML = emptyCount; // sets the total empty assignments

    let average = (score / (columnCount - 2)).toFixed(); // calculate the average to zero decimal places
    // clears the student name and id values
    studentname.value = '';
    id.value = '';

    row.lastElementChild.innerHTML = average; // sets the average
    row.lastElementChild.setAttribute('average', average);

    // switch to display the correct version of the average
    switch (averageDisplay) {
      case 'PERCENT':
        row.lastElementChild.innerHTML = average;
        break;
      case 'LETTER':
        row.lastElementChild.innerHTML = toLetterGrade(average);
        break;
      case 'GPA':
        row.lastElementChild.innerHTML = toGPAGrade(average);
        break;

      default:
        break;
    }
    // checks the average value and styles the cell based on the requirements
    if (average < 60) {
      row.lastElementChild.style.background = 'red';
      row.lastElementChild.style.color = 'white';
    } else {
      i % 2 == 0
        ? (row.lastElementChild.style.background = 'ivory')
        : (row.lastElementChild.style.background = 'beige');

      row.lastElementChild.style.color = 'black';
    }
  });
};

// listener for clicking on the add a column button
document.getElementById('addCol').addEventListener('click', () => {
  let title = document.getElementById('assignmentame');
  insertColumn(title.value);
  title.value = '';
});

// function to insert a new column
const insertColumn = (title) => {
  const allrows = document.getElementsByTagName('tr');
  const array = [...allrows];
  // checks if a title value has been passed byt the user
  // if not it automatically assigns it a title
  if (title.length < 1) {
    newColumnTitle = 'Assignment ' + (columnCount - 1);
  } else {
    newColumnTitle = title;
  }
  addNewCol(newColumnTitle); // adds the new column to each student in global data
  defaultData = { ...defaultData, [newColumnTitle]: '-' }; // adds the new column to default data so that it gets added to any new student

  // loops through each row to add the new column
  array.forEach((row, i) => {
    if (i == 0) {
      let newheading = (row.insertCell(
        columnCount
      ).outerHTML = `<th>${newColumnTitle}</th>`);
    } else {
      let newCol = row.insertCell(columnCount);
      newCol.id = 'score';
      newCol.setAttribute('contenteditable', 'true');
      newCol.setAttribute('oninput', 'handleUpdate()');
      newCol.setAttribute('dataScore', parseInt(newCol.innerHTML));
      newCol.setAttribute('dataAssignment', title);
    }
  });

  globalData.forEach((student) => {
    student[newColumnTitle] = '-';
  });
  columnCount++;

  update();
};

// function to handle a user clicking on a student name
// extra credit functionality
const selectRow = (row) => {
  // checks if the cell was highlighted and adds if not, removes if it was selected
  if (row.parentElement.className === 'highlight') {
    row.parentElement.className = '';
  } else {
    row.parentElement.className = 'highlight';
  }
};

// function to handle a user clicking on an assignment
// extra credit functionality
const selectCol = (col) => {
  const array = [...allRows];
  array.shift();
  // loops through each row
  array.forEach((row, i) => {
    const children = [...row.children];
    // loops through each child element in a row
    children.forEach((child) => {
      // checks if the child was highlighted and adds if not, removes if it was selected
      if (child.cellIndex === col.cellIndex) {
        if (child.className === 'highlight') {
          child.className = '';
        } else {
          child.className = 'highlight';
        }
      }
    });
  });

  // highlights the column heading if requried
  if (col.className === 'highlight') {
    col.className = '';
  } else {
    col.className = 'highlight';
  }
  update(); // updates the table
};
// function to help with the changing of a students average
const averageChange = () => {
  const headings = [...document.getElementsByTagName('th')]; // access the headings
  let heading = 'Average [%]'; // variable for tracking the current heading

  // switch to set up the averageDisplay and heading for the next click
  switch (averageDisplay) {
    case 'PERCENT':
      averageDisplay = 'LETTER';
      heading = 'Average [Letter]';
      break;
    case 'LETTER':
      averageDisplay = 'GPA';
      heading = 'Average [4.0]';
      break;
    case 'GPA':
      averageDisplay = 'PERCENT';
      heading = 'Average [%]';
      break;

    default:
      break;
  }
  headings[headings.length - 1].innerHTML = heading; // sets the heading to the correct average type
  update(); // update the table
};

// function to handle the user editing the cell
const handleUpdate = () => {
  const rowArray = [...allRows];
  rowArray.shift();
  // https://stackoverflow.com/questions/1391278/contenteditable-change-events
  rowArray.forEach((row) => {
    row.addEventListener(
      'input',
      function (e) {
        update();
      },
      false
    );
  });
};

// function to help convert the users grade
// source John Keating
// convert from number (percentage) grade to Letter Grade scale
function toLetterGrade(n) {
  let p = parseInt(n, 10); // in case it's a string
  let grades = {
    A: 93,
    'A-': 90,
    'B+': 87,
    B: 83,
    'B-': 80,
    'C+': 77,
    C: 73,
    'C-': 70,
    'D+': 67,
    D: 63,
    'D-': 60,
  };
  var grade = 'F';
  Object.keys(grades).some(function (k) {
    // iterate until truthy
    if (p >= grades[k]) {
      grade = k;
      return true;
    }
  });
  return grade;
}

// function to help convert the users grade
// source John Keating
// convert from number (percentage) grade to GPA 4.0 scale
function toGPAGrade(n) {
  let p = parseInt(n, 10); // in case it's a string
  let grades = {
    '4.0': 93,
    3.7: 90,
    3.3: 87,
    '3.0': 83,
    2.7: 80,
    2.3: 77,
    '2.0': 73,
    1.7: 70,
    1.3: 67,
    '1.0': 63,
    0.7: 60,
  };
  var grade = '0.0';
  Object.keys(grades).some(function (k) {
    // iterate until truthy
    if (p >= grades[k]) {
      grade = k;
      return true;
    }
  });
  return grade;
}

// function to help convert the users grade
// source John Keating
// convert from number (percentage) grade to Percentage scale
function toPercentGrade(n) {
  return n + '%';
}

// checks for a user clicking the reste button
document.getElementById('reset').addEventListener('click', () => {
  const originalData = JSON.parse(retreiveCookie()); //converts the cookie string data back to JSON
  globalData = originalData; // sets the globalData array to the cookie data
  // reset some global variables
  columnCount = 8;
  defaultData = {};
  createTableStructure();
  update();
});

// listens for a click on the add new row button
document.getElementById('addRow').addEventListener('click', () => {
  const row = createNewrow(studentname.value, id.value); // creates a new row with the student name and id
  globalData.push(row); // adds the new row to the globalData array
  createTableStructure();
  update();

  // reset the student name and id inputs to blank
  studentname.value = '';
  id.value = '';
});
