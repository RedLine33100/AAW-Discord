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
              docker.build().tag("aaw-backend").run()
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
