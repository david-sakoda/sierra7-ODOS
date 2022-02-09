#!/bin/bash
pipeline {
	options {
    buildDiscarder(logRotator(numToKeepStr: '30', artifactNumToKeepStr: '3'))
	}
    environment {
        def notificationContacts = "${distro}"
		def appName = "ODOS"
		def baseURL = ""
		def appURL = "${baseURL}/${environment}/${appName}"
		def environment = "DEV"
		def emailBodyPost = ""
		def fortifySh = ""	
    }

    stages {
        stage ('Initialize') {
            steps {
				script{
					try {
						sh 'echo "PATH = ${PATH}"'
						sh 'echo "M2_HOME = ${M2_HOME}"'
						list stageStatus = [:]
						stageStatus.put(env.STAGE_NAME, success)
					}
					catch (Exception e) {
						stageStatus.put(env.STAGE_NAME, failed)
						error "Stage $env.STAGE_NAME Failed"
					}
				}
            }
        }
		
		stage ('Start Email') {
			steps {
				script{
					try {
						echo hello
						stageStatus.put(env.STAGE_NAME, success)
					}
					catch (Exception e) {
						stageStatus.put(env.STAGE_NAME, failed)
						error "Stage $env.STAGE_NAME Failed"
					}
				}
			}
		}
		
		stage ('Build') {
			steps {
				script{
					try {
						//checkout code
						//checkout([$class: 'GitSCM', branches: [[name: '*/david-test']], extensions: [], userRemoteConfigs: [[credentialsId: 'gitAuth', url: 'https://github.com/david-sakoda/s7-ODOS-app.git']]])
						sh 'cd keycloak'
						sh 'ls -lrt'
					}
					catch (Exception e) {
						stageStatus.put(env.STAGE_NAME, failed)
						error "Stage $env.STAGE_NAME Failed"
					}
				}
			}
		}
		
		stage ('Security Scan') {
            steps {
				script{
					try {
						
						stageStatus.put(env.STAGE_NAME, success)
					}
					catch (Exception e) {
						stageStatus.put(env.STAGE_NAME, failed)
						error "Stage $env.STAGE_NAME Failed"
					}
				}
            }
        }
		
		stage ('Deploy') {
            steps {
				script{
					try {
					  sh 'echo "hello"'
						stageStatus.put(env.STAGE_NAME, success)
					}
					catch (Exception e) {
						stageStatus.put(env.STAGE_NAME, failed)
						error "Stage $env.STAGE_NAME Failed"
					}
				}
            }

        }		
		
		stage ('Automation Tests') {
            steps {
				script{
					try {
						sh 'echo "Starting Automation Tests. this is a place holder"'
						stageStatus.put(env.STAGE_NAME, success)
					}
					catch (Exception e) {
						stageStatus.put(env.STAGE_NAME, failed)
						error "Stage $env.STAGE_NAME Failed"
					}
				}
            }
        }
	}
	post{
		always{
			script{
				//def stageResults = ''
				//stageStatus.each{ key, val ->
				//	bat 'echo ' + key + ' : ' + val
					//stageResults += key
					//stageResults += ' : '
					//stageResults += val
					//stageResults += '<br />' 
					echo "always"
				//}
				//emailBodyPost = "<p> ${stageResults} <p> Artifacts are located <a href=\"${appURL}\">here</a>. <p> FPR located <a href=\"${env.BUILD_URL}\">here</a> "
			}
		}
		success {
            //mail to:"${notificationContacts}",
			//mimeType: "text/html",
			//subject:"SUCCESS: ${currentBuild.fullDisplayName}",
 		   // body: "<font color=\"green\"><strong>SUCCESS</strong></font>: SUCCESS <p> ${emailBodyPost}"
		   echo "success"
		}
		failure {
			///mail to:"${notificationContacts}",
			//mimeType: "text/html",
			//subject:"FAILURE: ${currentBuild.fullDisplayName}",
		    //body: "<font color=\"red\"><strong>FAILED</strong></font>: FAILURE <p> ${emailBodyPost}"
			echo "fail"
		}
	}
}