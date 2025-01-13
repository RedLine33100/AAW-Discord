pipeline{
  agent any
  stages{
    stage('Build'){
      steps{
        nodejs('Node'){
          echo "Building application"
          sh 'npm install'
        }
      }
    }
  }
}
