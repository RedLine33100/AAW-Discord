pipeline{
  agent any
  tools{
    nodejs 'latest'
  }
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
