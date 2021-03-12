const express = require("express");
const { resourceLimits } = require("worker_threads");

const app = express()
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

var questionary = [
    ["State which-one of the following statements about normal forms is FALSE?", ['BCNF is stricter than 3 NF', ' Lossless, dependency -preserving decomposition into 3NF is always possible', 'Loss less, dependency – preserving decomposition into BCNF is always possible', 'Any relation with two attributes is BCNF'], 2],
    
    ["Define the function of BCNF ?", ['dependency preserving and lossless join', 'not dependency and lossless join', 'dependency preserving and not lossless join', 'none of these'], 1],
    
    ['select the correct statement regarding BCNF?', [' loss less join and dependency preserving', 'loss less join but not dependency preserving', 'not loss less join but dependency preserving', 'None of these'], 1],
    
    ['Identify the statement which is correct for tables in second normal form (2NF):', ['Eliminate all hidden dependencies', 'Eliminate the possibility of a insertion anomalies', 'Have a composite key', 'Have all non key fields depend on the whole primary key'], 0],
    
    ['A -> B, B -> C, BC -> A, A -> D, E -> A, D -> E Identify Which of the following is not a key?',['A','E','B,C','D'],2]
];


app.get('/', (req, res) => {
    res.render('index');
})
// var index = 1
app.post('/retry', (req, res) => {
    res.redirect('/game/next0');
})


app.get('/success', (req, res) => {
    res.render('success')
})

// this is for first page
app.get('/game/next0', (req, res) => {
    var correct = questionary[0][2]
    // console.log(correct);
    res.render('game', { question: questionary[0][0], One: questionary[0][1][0], Two: questionary[0][1][1], Three: questionary[0][1][2], Four: questionary[0][1][3], correctData: questionary[0][1][correct], currentindex: 1});
})

// how to play page
app.get('/howtoplay', (req, res) => {
    res.render('howtoplay');
})

// this is for congratulations page
var finalLink = '/game/next' + questionary.length 
app.get(finalLink , (req, res) => {
    res.redirect("/success");
})

// displaying next and update data on game page
app.get('/game/next:indexing', (req, res) => {
    // console.log("this is index: "+req.params['indexing'])
    var index = parseInt(req.params['indexing'])
    // console.log(typeof(index));
    var correct = questionary[index][2];
    // console.log(typeof(correct))
    res.render('game', { question: questionary[index][0], One: questionary[index][1][0], Two: questionary[index][1][1], Three: questionary[index][1][2], Four: questionary[index][1][3], correctData: questionary[index][1][correct], currentindex: index+1 });
})


app.listen(process.env.PORT || 8000, () => {
    console.log("server is running");
})