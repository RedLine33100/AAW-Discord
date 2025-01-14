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
            sh 'docker stop apibackend' || true
            sh 'docker rm apibackend' || true
            script {
              img = docker.build("test")
              
              echo "B2"
              img.tag("apibackend")
              echo "B3"
              img.run("--name apibackend -p 8000:8000")
              echo "B4"
            }
            //sh 'sudo docker build --tag "aaw-backend" .'
          }
          dir("frontend"){
            sh 'npm install'
            sh 'npm start &'
          }
      }
    }
  }
}
