/**
 * This is the entry point to the program
 *
 * @param {array} input Array of student objects
 */



function classifier(input) {
  const presentYear = 2019;
  const studentsData = JSON.parse(JSON.stringify(input))
  studentsData.map((e) => {
    const fullDobYear = new Date(e.dob).getFullYear();
    e.age = presentYear - fullDobYear;
  });

  // sort students data according to age
  studentsData.sort((a, b) => (a.age > b.age) ? 1 : ((b.age > a.age) ? -1 : 0));

  let no = 1; // Group Number

  const output = studentsData.reduce((acc, student) => {
    let key = `group${no}`;
    const defaultGroup = () => {
      acc[key] = {
        members: [],
        oldest: 0,
        sum: 0,
        regNos: [],
      }
    }

    const pushStudent = () => {
      regNos = student.regNo;
      acc[key].oldest = student.age;
      acc[key].sum += student.age;
      acc[key].regNos.push(Number(regNos))
      acc[key].regNos.sort((a, b) => a - b)
      acc[key].members.push(student)
    }
    const createNewGroup = () => {
      no += 1;
      key = `group${no}`;
      defaultGroup();
      pushStudent();
    }

    // if Group does not exist, create one
    if (!acc[key]) {
      defaultGroup();
      pushStudent();
    } else if (acc[key].members.length < 3) {
      if (student.age <= acc[key].members[0].age + 5) {
        pushStudent();
      } else {
        createNewGroup();
      }
    } else if (acc[key].members.length == 3) {
      createNewGroup();
    }
    acc.noOfGroups = no;
    return acc;
  }, { noOfGroups: 0 })

  return (output)
}

module.exports = classifier;
