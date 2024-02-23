import { ApplicationLogger } from '@co-digital/logging/lib/ApplicationLogger';
import { createLogger } from '@co-digital/logging';

import { SERVICE_NAME } from '../config';

let logger: ApplicationLogger | undefined = undefined;

export const log = !logger ? (logger = createLogger(SERVICE_NAME)) : logger;
