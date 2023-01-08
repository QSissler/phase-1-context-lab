/* Your Code Here */
function createEmployeeRecord(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeRowData){
    return employeeRowData.map(row => createEmployeeRecord(row));
}

function createTimeInEvent(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date
    })

    return this
}

function createTimeOutEvent(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date
    })

    return this
}

function hoursWorkedOnDate(soughtDate){
    let inEvent = this.timeInEvents.find(e => e.date === soughtDate)
    let outEvent = this.timeOutEvents.find(e => e.date === soughtDate)

    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(soughtDate){
    let hoursWorked = hoursWorkedOnDate.call(this, soughtDate)
    return hoursWorked * this.payPerHour
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const workingDates = this.timeInEvents.map(e => e.date)

    const allWages = workingDates.reduce(function (wageAccumulator, date) {
        return wageAccumulator + wagesEarnedOnDate.call(this, date)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return allWages
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName)
  }

function calculatePayroll(employees){
    let everyWage = employees.reduce(function(wageAccumulator, employeeRecord){
        return wageAccumulator + allWagesFor.call(employeeRecord)
    }, 0)
    return everyWage
}
