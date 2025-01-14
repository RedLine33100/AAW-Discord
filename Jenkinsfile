pipeline{
  agent any
  tools{
    nodejs 'latest'
  }
  stages{
    stage('Build'){
      steps{
          echo "Building application"
          sh 'npm install'
      }
    }
  }
}
