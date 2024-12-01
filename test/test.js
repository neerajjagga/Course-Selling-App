const autocannon = require('autocannon');

function runBenchmark() {
  const instance = autocannon({
    url: 'http://localhost:3000/courses',
    duration: 60, // test duration in seconds
  });

  autocannon.track(instance);

  instance.on('done', () => {
    console.log('Benchmark completed');
  });
}

runBenchmark();
