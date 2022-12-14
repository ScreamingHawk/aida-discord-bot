exports.templateResource = (module, command, name, openaiApiKey) => {
  return {
    "Type": "AWS::Serverless::Function",
    "Properties": {
      "Handler": `src/modules/${module}/${command.replace('.js','')}.handler`,
      "Runtime": "nodejs14.x",
      "Architectures": [
        "x86_64"
      ],
      "MemorySize": 128,
      "Timeout": 10,
      "Policies": [
        "AWSLambdaBasicExecutionRole"
      ],
      "Events": {
        "SNSEvent": {
          "Type": "SNS",
          "Properties": {
            "Topic": {
              "Ref": "MainSNSTopic"
            },
            "FilterPolicy": {
              "command": [
                name
              ]
            }
          }
        }
      },
      "Environment": {
        "Variables": {
          "OPENAI_API_KEY": openaiApiKey,
        }
      },
      "DeadLetterQueue": {
        "Type": "SQS",
        "TargetArn": {"Fn::GetAtt": ["DeadLetterQueue.Arn"]},
      },
    }
  }
}

exports.handleNameChange = (resource, name) => {
  resource.Properties.Events.SNSEvent.Properties.FilterPolicy.command = [name]
  return resource
}
