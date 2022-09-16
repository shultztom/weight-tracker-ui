PACKAGE_VERSION=$(node -p "require('./package.json').version")

gcloud auth print-access-token | helm registry login -u oauth2accesstoken \
--password-stdin https://us-central1-docker.pkg.dev

helm upgrade --install weight-tracker-ui oci://us-central1-docker.pkg.dev/shultzlab/shultzlab-helm/http-deploy --version 0.1.0 -f .helm/deploy/values.yaml --set image.tag=$PACKAGE_VERSION 