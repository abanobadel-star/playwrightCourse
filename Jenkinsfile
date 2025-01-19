pipeline {
    agent any

    parameters {
        choice(name: 'BRANCH_NAME', choices: ['main', 'develop', 'feature-branch'], description: 'Select branch to run')
        string(name: 'TAGS', defaultValue: '', description: 'Enter Playwright tags (e.g., @smoke,@regression)')
    }

    environment {
        NODEJS_VERSION = '18' // Adjust this if needed
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    echo "Checking out branch: ${params.BRANCH_NAME}"
                    checkout([$class: 'GitSCM', branches: [[name: "*/${params.BRANCH_NAME}"]],
                              userRemoteConfigs: [[url: 'https://github.com/abanobadel-star/playwrightCourse.git']]])
                }
            }
        }

        stage('Setup Node.js & Install Dependencies') {
            steps {
                script {
                    bat 'node -v' // Verify Node.js installation
                    bat 'npm install' // Install dependencies
                }
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                script {
                    bat 'npx playwright install --with-deps' // Install required browsers
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    def command = 'npx playwright test'
                    if (params.TAGS?.trim()) {
                        command += " --grep \"${params.TAGS}\""
                    }
                    bat command
                }
            }
        }

        stage('Publish Reports') {
            steps {
                script {
                    publishHTML([
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Test Report',
                        keepAll: true,
                        alwaysLinkToLastBuild: true,
                        allowMissing: false
                    ])
                }
            }
        }
    }
}
