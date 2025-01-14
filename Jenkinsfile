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
            script {
              img = docker.build("test")
              
              echo "B2"
              img.tag("aaw-backend")
              echo "B3"
              img.run("-p 8000:8000")
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
