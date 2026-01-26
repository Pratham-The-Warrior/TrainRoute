const { z } = require('zod');

const routeSchema = z.object({
    source: z.string().min(2).max(10).toUpperCase(),
    destination: z.string().min(2).max(10).toUpperCase(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
    max_switches: z.number().int().min(0).max(5).default(2),
    max_wait_time: z.number().int().min(0).max(1440).default(240),
    preferred_classes: z.array(z.string()).optional().default(['2A', '3A', 'SL'])
});

const validateRouteRequest = (req, res, next) => {
    try {
        req.body = routeSchema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            errors: error.errors
        });
    }
};

module.exports = { validateRouteRequest };
