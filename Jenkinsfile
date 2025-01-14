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
            img = docker.build()
            img.tag("aaw-backend")
            img.run()
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
