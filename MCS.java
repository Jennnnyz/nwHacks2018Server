    //To process the image
    private AnalysisResult process() throws VisionServiceException, IOException {
        Gson gson = new Gson();
        String[] features = {"Categories"};
        String[] details = {};

        // Put the image into an input stream for detection.
        mBitmap.compress(Bitmap.CompressFormat.JPEG, 100, output);
        ByteArrayInputStream inputStream = new ByteArrayInputStream(output.toByteArray());

        AnalysisResult v = this.client.analyzeImage(inputStream, features, details);

        return v;
    }

//To create the client
    if (client==null){
    client = new VisionServiceRestClient(getString(R.string.subscription_key), getString(R.string.subscription_apiroot));
}

//To get the category
AnalysisResult v = process();
Category[] categories = v.Categories;
/* send server the cateogry with the highest accuracy*/

