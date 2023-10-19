import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Input, Radio, Statistic, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const OverViewSection = () => {
    const [clientCount, setClientCount] = useState(0);

    useEffect(() => {
      // Simulate fetching the initial client count from your data source
      const initialClientCount = 150; // Replace with your actual client count
      setClientCount(initialClientCount);
  
      // Create an interval to update the counter every 5 seconds (5000 ms)
      const interval = setInterval(() => {
        // Simulate fetching updated client count from your data source
        const updatedClientCount = getRandomInt(150, 200); // Replace with your actual client count
        setClientCount(updatedClientCount);
      }, 2000);
  
      // Clear the interval when the component unmounts
      return () => {
        clearInterval(interval);
      };
    }, []);
  
    // Function to get a random integer between min and max (inclusive)
    const getRandomInt = (min: any, max: any) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
  
  return (
    <div> 
        <div className="open-hours-card-container"> 
    <Card
      title="Open Hours"
      className="open-hours-card"
      style={{backgroundColor:"#e8e8e8"}}
    >
      <Title level={5}>Sed ut perspiciatis unde omnis</Title>
      <p>This is Complete friendly services center</p>
      <Paragraph>
        Mon-Fri: 9 AM – 6 PM<br />
        Saturday: 9 AM – 4 PM<br />
        Sunday: 10 AM – 3 PM
      </Paragraph>
    </Card>
     <div>
     <Card title="Survey">
      <Form >
        <Form.Item name="overallSatisfaction" label="Overall Satisfaction">
          <Radio.Group>
            <Radio value="verySatisfied">Very Satisfied</Radio>
            <Radio value="satisfied">Satisfied</Radio>
            <Radio value="neutral">Neutral</Radio>
            <Radio value="dissatisfied">Dissatisfied</Radio>
            <Radio value="veryDissatisfied">Very Dissatisfied</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="serviceQuality" label="Service Quality">
          <Radio.Group>
            <Radio value={1}>1</Radio>
            <Radio value={2}>2</Radio>
            <Radio value={3}>3</Radio>
            <Radio value={4}>4</Radio>
            <Radio value={5}>5</Radio>
            <Radio value={6}>6</Radio>
            <Radio value={7}>7</Radio>
            <Radio value={8}>8</Radio>
            <Radio value={9}>9</Radio>
            <Radio value={10}>10</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="serviceExperience" label="Service Experience">
          <Radio.Group>
            <Radio value="excellent">Excellent</Radio>
            <Radio value="good">Good</Radio>
            <Radio value="fair">Fair</Radio>
            <Radio value="poor">Poor</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="easeOfUse" label="Ease of Use">
          <Radio.Group>
            <Radio value="veryEasy">Very Easy</Radio>
            <Radio value="somewhatEasy">Somewhat Easy</Radio>
            <Radio value="neutral">Neutral</Radio>
            <Radio value="somewhatDifficult">Somewhat Difficult</Radio>
            <Radio value="veryDifficult">Very Difficult</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="serviceFeatures" label="Service Features">
          <Radio.Group>
            <Radio value="hardwareRepairs">Hardware Repairs</Radio>
            <Radio value="softwareSolutions">Software Solutions</Radio>
            <Radio value="networkingServices">Networking Services</Radio>
            <Radio value="dataRecovery">Data Recovery</Radio>
            <Radio value="itConsultation">IT Consultation</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="improvements" label="Improvements">
          <Input.TextArea />
        </Form.Item>

        <Form.Item name="recommendation" label="Recommendation">
          <Radio.Group>
            <Radio value="veryLikely">Very Likely</Radio>
            <Radio value="likely">Likely</Radio>
            <Radio value="neutral">Neutral</Radio>
            <Radio value="unlikely">Unlikely</Radio>
            <Radio value="veryUnlikely">Very Unlikely</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="comments" label="Comments and Suggestions">
          <Input.TextArea />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
     </div>
    <Card
      title=""
      className="open-hours-card"
      style={{backgroundColor:"#e8e8e8",marginLeft:"30px"}}
    >
     <Card title="Total Count" style={{ textAlign: 'center' }}>
      <Title level={2}>
        <Statistic value={clientCount} />
      </Title>
    </Card>
    </Card>
  </div>
    </div>
  );
};

export default OverViewSection;
