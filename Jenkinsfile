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
            sh 'npm install'
            sh 'npm build'
            sh 'npm start &'
          }
          dir("frontend"){
            sh 'npm install'
            sh 'npm start &'
          }
      }
    }
  }
}
