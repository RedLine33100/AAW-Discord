pipeline{
  agent any
  tools{
    nodejs 'latest'
  }
  stages{
    stage('Build'){
      steps{
          echo "Building application"
          dir("backend"){
            sh 'docker stop apibackend || true'
            sh 'docker rm apibackend || true'
            script {
              img = docker.build("test")
              
              echo "B2"
              img.tag("apibackend")
              echo "B3"
              def now = new Date()
              img.run("--name apibackend -p 8000:8000 . &> /logs/apibackend"+now.format("yyMMdd_HHmm", TimeZone.getTimeZone('UTC+1'))+".log")
              echo "B4"
            }
            //sh 'sudo docker build --tag "aaw-backend" .'
          }
          dir("frontend"){
            sh 'docker stop aawfrontend || true'
            sh 'docker rm aawfrontend || true'
            script {
              img = docker.build("test")
              
              echo "C2"
              img.tag("aawfrontend")
              echo "C3"
              def now = new Date()
              img.run("--name aawfrontend -p 3777:3777 . &> /logs/aawfrontend"+now.format("yyMMdd_HHmm", TimeZone.getTimeZone('UTC+1'))+".log")
              echo "C4"
            }
          }
      }
    }
  }
}
