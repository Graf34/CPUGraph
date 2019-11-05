var queries = 0;
var errors  = 0;

var pe=document.getElementById('errors');

function addData(chart) {
    queries++;
    
    document.getElementById('queries').innerHTML='Запросы: '+ queries;
     fetch('http://exercise.develop.maximaster.ru/service/cpu/')//Запрос 
        .then(function (responce) {
            return responce.json();//Получение данных из json
        })
        
        .then(function (json) {
  chart.data.labels.push(chart.data.labels[chart.data.labels.length - 1]+5);//Время
    chart.data.datasets.forEach((dataset) => {
        if (json!=0){//Если ответ не 0
        dataset.data.push(json);//Записать его в график
        }
        else{
            errors++;
            dataset.data.push(dataset.data[dataset.data.length - 1]);//Иначе записать предыдущий
        }
        
    });
    chart.update(0);//Обновление графика без анимации
    var errorsproc = ((errors/queries)*100)
    document.getElementById('errors').innerHTML='Ошибки: '+ errorsproc.toFixed(2) + '%';
});

}
var ctx = document.getElementById('myChart');//Создание графика
var myChart = new Chart(ctx, {
    type: 'line',//Тип линия
    data: {
        labels: [0],
        datasets: [{
            label: 'CPU',
            data: [],
            backgroundColor: [
                'rgba(46, 150, 255, 0)'
            ],
            borderColor: [
                'rgba(46, 150, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
setInterval(addData,5000,myChart);//Вызывать каждые 5 секунд


