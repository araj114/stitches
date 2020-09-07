import React from 'react';
import NextLink from 'next/link';
import { Container, Text, Button, Box, Flex, Divider, Link, Badge } from '@modulz/design-system';
import { ArrowLeftIcon } from '@modulz/radix-icons';
import { parseISO, format } from 'date-fns';
import { FrontMatter } from '../types';
import { TitleAndMetaTags } from '../components/TitleAndMetaTags';
import { getDocById } from '../utils/docsPosts';
import { authors } from '../data/authors';

export default (frontMatter: FrontMatter) => {
  const isBlog = frontMatter.id.includes('blog/');

  return ({ children }) => {
    return (
      <>
        <TitleAndMetaTags title={`${frontMatter.title} — Stitches`} />

        {isBlog && (
          <Container size="3" css={{ mb: '$5', mt: '-$9' }}>
            <NextLink href="/blog" passHref>
              <Button size="large" as="a" variant="ghost" css={{ color: '$gray600', bp2: { ml: '-40px' } }}>
                <Box css={{ mr: '$2' }}>
                  <ArrowLeftIcon />
                </Box>
                Blog
              </Button>
            </NextLink>
          </Container>
        )}

        <Container size="3">
          <Text as="h1" size="8" css={{ fontWeight: 500, mb: '$2' }}>
            {frontMatter.title}
          </Text>

          {isBlog && (
            <Flex css={{ mt: '$3', mb: '$3', alignItems: 'center' }}>
              {/* <Avatar src={authors[frontMatter.by].avatar} mr={2} /> */}
              <Text as="p" size="2" css={{ color: '$gray600', lineHeight: 0 }}>
                <Link
                  href={`https://twitter.com/${authors[frontMatter.by].twitter}`}
                  rel="noopener noreferrer"
                  variant="subtle"
                >
                  {authors[frontMatter.by].name}
                </Link>
              </Text>
              <Divider orientation="vertical" css={{ mx: '$2' }} />
              <Text as="time" size="2" css={{ color: '$gray600', lineHeight: 0 }}>
                {format(parseISO(frontMatter.publishedAt), 'MMMM yyyy')}
              </Text>
              <Divider orientation="vertical" css={{ mx: '$2' }} />
              <Text size="2" css={{ color: '$gray600', lineHeight: 0 }}>
                {frontMatter.readingTime.text}
              </Text>
              {frontMatter.type === 'changelog' && (
                <>
                  <Divider orientation="vertical" css={{ mx: '$2' }} />
                  <Badge>
                    Changelog
                  </Badge>
                </>
              )}
            </Flex>
          )}

          <Box>{children}</Box>

          {Boolean(frontMatter.relatedIds) && (
            <>
              <Divider size="large" css={{ my: '$8', mx: 'auto' }} />
              <Box>
                <Text
                  as="h3"
                  size="2"
                  css={{
                    mb: '$3',
                    fontWeight: 500,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                  }}
                >
                  Related
                </Text>

                <Flex css={{ my: '$4', flexDirection: 'column', gap: '$4' }}>
                  {frontMatter.relatedIds.map((relatedPostId) => {
                    const post = getDocById(relatedPostId);
                    return (
                      <Box
                        as="a"
                        key={post.id}
                        href={`/${post.id}`}
                        css={{
                          textDecoration: 'none',
                          color: 'inherit',
                        }}
                      >
                        <Box>
                          <Text
                            as="h6"
                            size="4"
                            css={{
                              fontWeight: 500,
                              mb: '$1',
                            }}
                          >
                            {post.title}
                          </Text>
                          <Text
                            as="p"
                            size="3"
                            css={{
                              color: '$hiContrast',
                            }}
                          >
                            {post.description}
                          </Text>
                        </Box>
                      </Box>
                    );
                  })}
                </Flex>
              </Box>
            </>
          )}
        </Container>
      </>
    );
  };
};
