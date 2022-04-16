import React from 'react';
import styled from 'styled-components';
import product from 'assets/img/product.png';

import Text from 'components/Common/Text';
import Section from 'components/Marketing/Section';

const StyledProduct = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: var(--spacing-large);
  align-items: center;
`;

const ProductImage = styled.img`
  border-radius: 3rem;
  box-shadow: 0px 6px 7px #ccc;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-6px);
  }
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailItem = styled.div`
  display: grid;
  grid-template-columns: 8rem 1fr;
  margin: var(--spacing-base) 0;
  align-items: center;
`;

const DetailNumber = styled.div`
  min-width: 5rem;
  min-height: 5rem;
  max-width: 5rem;
  max-height: 5rem;
  background-color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: var(--box-shadow);
`;

function Product() {
  return (
    <Section
      title="A Closer Look"
      subtitle="Learn more about how our product works"
      background="var(--color-bg-light)"
    >
      <StyledProduct>
        <ProductImage src={product} />
        <ProductDetails>
          <DetailItem>
            <DetailNumber>
              <Text type="large" color="white">
                1
              </Text>
            </DetailNumber>
            <Text type="large">Add events to your calendar</Text>
          </DetailItem>
          <DetailItem>
            <DetailNumber>
              <Text type="large" color="white">
                2
              </Text>
            </DetailNumber>
            <Text type="large">Manage your tasks in various lists</Text>
          </DetailItem>
          <DetailItem>
            <DetailNumber>
              <Text type="large" color="white">
                3
              </Text>
            </DetailNumber>
            <Text type="large">Create a custom avatar</Text>
          </DetailItem>
        </ProductDetails>
      </StyledProduct>
    </Section>
  );
}

export default Product;
