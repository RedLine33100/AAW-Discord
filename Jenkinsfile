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
              img = docker.build()
              
              echo "B2"
              img.tag("aaw-backend")
              echo "B3"
              img.run()
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
