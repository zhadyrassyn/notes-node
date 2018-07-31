const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');
let titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};

let bodyOptions = {
  describe: 'Body of a note',
  demand: true,
  alias: 'b'
};

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions ,
    body: bodyOptions
  })
  .command('list', 'List all notes')
  .command('fetch', 'Read a note', {
    title: titleOptions
  })
  .command('remove', 'Remove a note', {
    title: titleOptions
  })
  .help()
  .argv;

const command = argv._[0];
// console.log('Command: ', command);
// console.log('Yargs: ', argv);

if (command === 'add') {
  const note = notes.addNote(argv.title, argv.body);
  if(note) {
    console.log('Note created');
    notes.logNote(note);
  } else {
    console.log('Not exists');
  }
} else if (command === 'list') {
  const allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach(note => notes.logNote(note));
  return allNotes;
} else if (command === 'remove') {
  const title = argv.title;
  const isRemoved = notes.remove(title);
  if(isRemoved) {
    console.log(`Removed note title: ${title}`);
  } else {
    console.log(`Fail removing note: ${title}`);
  }
} else if(command === 'fetch') {
  const title = argv.title;
  const note = notes.fetch(title);
  if(note) {
    console.log('Reading note');
    notes.logNote(note);
  } else {
    console.log('Failed reading note with title ' + title);
  }
} else {
  console.log('Not recognized');
}

//
// console.log(_.isString(true));
// console.log(_.isString('Daniyar'));
//
// const filteredArray = _.uniq(['Daniyar', 1, 'Mike', 1, 2, 3, 4]);
// console.log(filteredArray);

// const user = os.userInfo();
//
// fs.appendFile('greetings.txt', `Hello ${user.username}! You are ${notes.age}.`, function (err) {
//   if(err) {
//     console.log('Unable to write to file');
//   }
// });