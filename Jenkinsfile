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
              img = docker.build("apibackendi")
              
              echo "B2"
              img.tag("apibackend")
              echo "B3"
              sh 'cp /var/docker/backend/.env '+workspace+'/backend'
              sh 'docker run -d --env-file .env --restart always --name apibackend -p 8000:8000 apibackendi'
              //img.run("--name apibackend -p 8000:8000 .)
              echo "B4"
            }
            //sh 'sudo docker build --tag "aaw-backend" .'
          }
          dir("frontend"){
            sh 'docker stop aawfrontend || true'
            sh 'docker rm aawfrontend || true'
            script {
              img = docker.build("aawfrontendi")
              
              echo "C2"
              img.tag("aawfrontend")
              echo "C3"
              sh 'cp /var/docker/frontend/.env '+workspace+'/frontend'
              sh 'docker run -d --env-file .env --restart always --name aawfrontend -p 3777:3777 aawfrontendi'
              echo "C4"
            }
          }
      }
    }
  }
}
